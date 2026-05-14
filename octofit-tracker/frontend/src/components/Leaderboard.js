import ResourcePage from './ResourcePage';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`
  : 'http://localhost:8000/api/leaderboards/';

function Leaderboard() {
  return (
    <ResourcePage
      columns={[
        { header: 'Rank', render: (entry) => entry.rank },
        { header: 'Team', render: (entry) => entry.team?.name || 'N/A' },
        {
          header: 'Points',
          render: (entry) => <span className="fw-bold text-primary">{entry.points}</span>,
        },
        { header: 'Created', render: (entry) => entry.created_at || 'N/A' },
      ]}
      emptyMessage="No leaderboard entries returned by the API."
      endpoint={endpoint}
      getSearchText={(entry) =>
        [entry.rank, entry.team?.name || '', entry.points, entry.created_at || ''].join(' ')
      }
      renderHighlights={(entries) => {
        const sortedEntries = [...entries].sort((first, second) => second.points - first.points);

        return [
          { label: 'Teams ranked', value: entries.length },
          { label: 'Current leader', value: sortedEntries[0]?.team?.name || 'N/A' },
          { label: 'Top score', value: sortedEntries[0]?.points ?? 'N/A' },
        ];
      }}
      renderModalFields={(entry) => [
        { label: 'Rank', value: entry.rank },
        { label: 'Team', value: entry.team?.name || 'N/A' },
        { label: 'Points', value: entry.points },
        { label: 'Created', value: entry.created_at || 'N/A' },
      ]}
      searchPlaceholder="Search by rank, team, points, or date"
      subtitle="Track competitive momentum with a cleaner ranking table and one-click detail views for each entry."
      title="Leaderboard"
    />
  );
}

export default Leaderboard;