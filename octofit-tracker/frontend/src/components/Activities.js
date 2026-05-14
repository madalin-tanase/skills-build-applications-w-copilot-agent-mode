import ResourcePage from './ResourcePage';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  return (
    <ResourcePage
      columns={[
        { header: 'ID', render: (activity) => activity.id },
        { header: 'User', render: (activity) => activity.user?.username || 'N/A' },
        {
          header: 'Type',
          render: (activity) => (
            <span className="badge rounded-pill text-bg-primary">{activity.type}</span>
          ),
        },
        { header: 'Duration', render: (activity) => `${activity.duration} min` },
        { header: 'Distance', render: (activity) => `${activity.distance} km` },
        { header: 'Created', render: (activity) => activity.created_at || 'N/A' },
      ]}
      emptyMessage="No activities returned by the API."
      endpoint={endpoint}
      getSearchText={(activity) =>
        [
          activity.id,
          activity.user?.username || '',
          activity.user?.team?.name || '',
          activity.type,
          activity.created_at || '',
        ].join(' ')
      }
      renderHighlights={(activities) => {
        const totalMinutes = activities.reduce(
          (sum, activity) => sum + (Number(activity.duration) || 0),
          0
        );
        const totalDistance = activities.reduce(
          (sum, activity) => sum + (Number(activity.distance) || 0),
          0
        );

        return [
          { label: 'Sessions logged', value: activities.length },
          { label: 'Minutes trained', value: totalMinutes },
          { label: 'Distance tracked', value: `${totalDistance.toFixed(1)} km` },
        ];
      }}
      renderModalFields={(activity) => [
        { label: 'Activity ID', value: activity.id },
        { label: 'User', value: activity.user?.username || 'N/A' },
        { label: 'Team', value: activity.user?.team?.name || 'Unassigned' },
        { label: 'Type', value: activity.type },
        { label: 'Duration', value: `${activity.duration} min` },
        { label: 'Distance', value: `${activity.distance} km` },
        { label: 'Created', value: activity.created_at || 'N/A' },
      ]}
      searchPlaceholder="Search by user, team, activity type, or date"
      subtitle="Review training volume and quickly inspect which athletes are driving your activity totals."
      title="Activities"
    />
  );
}

export default Activities;