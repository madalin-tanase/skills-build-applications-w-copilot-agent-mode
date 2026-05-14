import { useCallback, useEffect, useMemo, useState } from 'react';

function formatDisplayValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  if (typeof value === 'object') {
    if (value.name) {
      return value.name;
    }

    if (value.username) {
      return value.username;
    }

    return JSON.stringify(value);
  }

  return String(value);
}

function ResourcePage({
  title,
  subtitle,
  endpoint,
  columns,
  emptyMessage,
  searchPlaceholder,
  getSearchText,
  renderHighlights,
  renderModalFields,
}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setItems(Array.isArray(data) ? data : data.results || []);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      getSearchText(item).toLowerCase().includes(normalizedQuery)
    );
  }, [getSearchText, items, query]);

  const highlights = renderHighlights(items);
  const modalFields = selectedItem ? renderModalFields(selectedItem) : [];

  return (
    <section className="resource-page card border-0 shadow-lg overflow-hidden">
      <div className="card-body p-0">
        <div className="resource-page__hero p-4 p-lg-5 border-bottom">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-start">
            <div>
              <p className="text-uppercase small fw-semibold text-primary mb-2">
                OctoFit data center
              </p>
              <h1 className="display-6 fw-bold mb-3">{title}</h1>
              <p className="text-secondary mb-3 resource-page__lede">{subtitle}</p>
              <a className="link-primary fw-semibold text-decoration-none" href={endpoint} rel="noreferrer" target="_blank">
                Open API endpoint
              </a>
            </div>
            <div className="resource-page__actions d-flex flex-column gap-3 align-items-stretch align-items-lg-end">
              <button className="btn btn-primary btn-lg px-4" onClick={fetchItems} type="button">
                Refresh data
              </button>
              <span className="badge rounded-pill text-bg-light border text-dark px-3 py-2">
                {filteredItems.length} visible
              </span>
            </div>
          </div>

          <div className="row g-3 mt-1">
            {highlights.map((highlight) => (
              <div className="col-12 col-md-4" key={highlight.label}>
                <article className="card border-0 shadow-sm h-100 resource-stat-card">
                  <div className="card-body">
                    <p className="text-uppercase small fw-semibold text-secondary mb-2">
                      {highlight.label}
                    </p>
                    <h2 className="h3 mb-0">{highlight.value}</h2>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 p-lg-5">
          <div className="card border-0 shadow-sm resource-controls mb-4">
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-12 col-lg-8">
                  <label className="form-label fw-semibold" htmlFor={`${title.toLowerCase()}-search`}>
                    Filter records
                  </label>
                  <input
                    className="form-control form-control-lg"
                    id={`${title.toLowerCase()}-search`}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={searchPlaceholder}
                    type="search"
                    value={query}
                  />
                </div>
                <div className="col-12 col-lg-4 d-grid d-lg-flex justify-content-lg-end gap-2">
                  <button className="btn btn-outline-secondary" onClick={() => setQuery('')} type="button">
                    Clear
                  </button>
                  <button className="btn btn-outline-primary" onClick={fetchItems} type="button">
                    Sync now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading ? <div className="alert alert-info mb-4">Loading {title.toLowerCase()}...</div> : null}
          {error ? <div className="alert alert-danger mb-4">{error}</div> : null}

          {!loading && !error ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0 resource-table">
                    <thead className="table-light">
                      <tr>
                        {columns.map((column) => (
                          <th key={column.header} scope="col">
                            {column.header}
                          </th>
                        ))}
                        <th className="text-end" scope="col">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <tr key={item.id}>
                            {columns.map((column) => (
                              <td key={`${item.id}-${column.header}`}>{column.render(item)}</td>
                            ))}
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-dark"
                                onClick={() => setSelectedItem(item)}
                                type="button"
                              >
                                View details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-muted py-4 text-center" colSpan={columns.length + 1}>
                            {emptyMessage}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {selectedItem ? (
        <>
          <div className="modal fade show d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-0 pb-0">
                  <div>
                    <p className="text-uppercase small fw-semibold text-primary mb-1">
                      Record details
                    </p>
                    <h2 className="modal-title h4 mb-0">{title} item</h2>
                  </div>
                  <button
                    aria-label="Close"
                    className="btn-close"
                    onClick={() => setSelectedItem(null)}
                    type="button"
                  />
                </div>
                <div className="modal-body pt-3">
                  <div className="row g-3">
                    {modalFields.map((field) => (
                      <div className="col-12 col-md-6" key={field.label}>
                        <div className="card h-100 border-0 bg-light-subtle">
                          <div className="card-body">
                            <p className="text-uppercase small fw-semibold text-secondary mb-2">
                              {field.label}
                            </p>
                            <p className="mb-0 fw-semibold">{formatDisplayValue(field.value)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button className="btn btn-secondary" onClick={() => setSelectedItem(null)} type="button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      ) : null}
    </section>
  );
}

export default ResourcePage;