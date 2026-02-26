/**
 * Layout guard for /superadmin routes.
 * Since is_staff is determined server-side through the profile endpoint,
 * we protect this at the component level in the page itself using useProfile().
 * The layout just provides the wrapper structure.
 */
export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
