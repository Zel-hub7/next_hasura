// app/protected/page.tsx

import LogoutButton from '../components/LogoutButton';
import ProtectedContent from '../components/ProtectedContent';
import WelcomePage from '../welcome/page';

export default function ProtectedPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2>Test Protected Route</h2>
      <ProtectedContent />
      <LogoutButton />
      <WelcomePage />
    </div>
  );
}
