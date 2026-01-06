'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function LoginPage() {
  return (
    <div className="bg-white rounded-lg shadow-floating p-2xl max-w-md w-full text-center">
      {/* Logo */}
      <div className="text-6xl mb-lg">ৎ</div>

      {/* Title & Tagline */}
      <h1 className="text-3xl font-bold text-neutral-800 mb-sm">Seva-Setu</h1>
      <p className="text-lg text-neutral-600 mb-2xl font-semibold">
        Your Ward, Your Voice. Fixed by AI.
      </p>

      {/* Role Selection */}
      <div className="space-y-md mb-lg">
        <h2 className="text-lg font-bold text-neutral-800 mb-lg">Select Your Role</h2>

        <Link href="/admin">
          <Button variant="primary" size="full">
            <span className="material-icons mr-sm">admin_panel_settings</span>
            Admin / Officer
          </Button>
        </Link>

        <Link href="/user">
          <Button variant="secondary" size="full">
            <span className="material-icons mr-sm">person</span>
            Citizen / User
          </Button>
        </Link>

        <Link href="/worker">
          <Button variant="secondary" size="full">
            <span className="material-icons mr-sm">construction_worker</span>
            Field Worker
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <p className="text-xs text-neutral-500">
        © 2026 Seva-Setu. Powered by AI.
      </p>
    </div>
  );
}
