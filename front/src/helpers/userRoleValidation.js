export const userRoleValidation = (user) => {
  return user?.attributes['custom:role'] === '1';
}
