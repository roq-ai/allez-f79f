const mapping: Record<string, string> = {
  accountants: 'accountant',
  'individual-users': 'individual_user',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
