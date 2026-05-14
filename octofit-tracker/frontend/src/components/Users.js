import ResourcePage from './ResourcePage';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  return (
    <ResourcePage
      columns={[
        { header: 'ID', render: (user) => user.id },
        { header: 'Username', render: (user) => user.username },
        { header: 'Email', render: (user) => user.email },
        { header: 'Team', render: (user) => user.team?.name || 'Unassigned' },
      ]}
      emptyMessage="No users returned by the API."
      endpoint={endpoint}
      getSearchText={(user) =>
        [user.id, user.username, user.email, user.team?.name || '']
          .filter(Boolean)
          .join(' ')
      }
      renderHighlights={(users) => {
        const assignedUsers = users.filter((user) => user.team).length;

        return [
          { label: 'Total users', value: users.length },
          { label: 'Assigned to teams', value: assignedUsers },
          { label: 'Unassigned', value: users.length - assignedUsers },
        ];
      }}
      renderModalFields={(user) => [
        { label: 'User ID', value: user.id },
        { label: 'Username', value: user.username },
        { label: 'Email', value: user.email },
        { label: 'Team', value: user.team?.name || 'Unassigned' },
      ]}
      searchPlaceholder="Search by username, email, or team"
      subtitle="Monitor your athlete roster, spot missing team assignments, and keep profile data easy to scan."
      title="Users"
    />
  );
}

export default Users;