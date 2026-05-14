import ResourcePage from './ResourcePage';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  return (
    <ResourcePage
      columns={[
        { header: 'ID', render: (workout) => workout.id },
        { header: 'Workout', render: (workout) => workout.name },
        { header: 'User', render: (workout) => workout.user?.username || 'N/A' },
        {
          header: 'Description',
          render: (workout) => (
            <span className="text-secondary">{workout.description || 'No description'}</span>
          ),
        },
        { header: 'Created', render: (workout) => workout.created_at || 'N/A' },
      ]}
      emptyMessage="No workouts returned by the API."
      endpoint={endpoint}
      getSearchText={(workout) =>
        [
          workout.id,
          workout.name,
          workout.description || '',
          workout.user?.username || '',
          workout.created_at || '',
        ].join(' ')
      }
      renderHighlights={(workouts) => [
        { label: 'Workout plans', value: workouts.length },
        {
          label: 'Named sessions',
          value: workouts.filter((workout) => workout.name).length,
        },
        {
          label: 'Latest created',
          value: workouts[0]?.created_at ? new Date(workouts[0].created_at).toLocaleDateString() : 'N/A',
        },
      ]}
      renderModalFields={(workout) => [
        { label: 'Workout ID', value: workout.id },
        { label: 'Workout name', value: workout.name },
        { label: 'Assigned user', value: workout.user?.username || 'N/A' },
        { label: 'Description', value: workout.description || 'No description' },
        { label: 'Created', value: workout.created_at || 'N/A' },
      ]}
      searchPlaceholder="Search by workout, description, user, or date"
      subtitle="Surface suggested plans in the same structured view as the rest of the app so coaching data stays readable."
      title="Workouts"
    />
  );
}

export default Workouts;