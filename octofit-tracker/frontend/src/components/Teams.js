import ResourcePage from './ResourcePage';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  return (
    <ResourcePage
      columns={[
        { header: 'ID', render: (team) => team.id },
        { header: 'Team name', render: (team) => team.name },
        {
          header: 'Status',
          render: () => <span className="badge rounded-pill text-bg-success">Active</span>,
        },
      ]}
      emptyMessage="No teams returned by the API."
      endpoint={endpoint}
      getSearchText={(team) => [team.id, team.name].join(' ')}
      renderHighlights={(teams) => [
        { label: 'Total teams', value: teams.length },
        {
          label: 'Alphabetical first',
          value: teams.length > 0 ? [...teams].sort((a, b) => a.name.localeCompare(b.name))[0].name : 'N/A',
        },
        { label: 'Ready for competition', value: `${teams.length} squads` },
      ]}
      renderModalFields={(team) => [
        { label: 'Team ID', value: team.id },
        { label: 'Team name', value: team.name },
        { label: 'Roster status', value: 'Ready for member assignments' },
      ]}
      searchPlaceholder="Search by team name or ID"
      subtitle="Keep team structures clean and visible before they roll up into the leaderboard."
      title="Teams"
    />
  );
}

export default Teams;