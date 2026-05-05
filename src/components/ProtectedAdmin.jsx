import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Navigate } from 'react-router-dom';
const SUPABASE_URL = 'https://qayclaepxapjwqfwpnzm.supabase.co';
const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);


function ProtectedAdminRoute({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (mounted) setStatus('unauthorized');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || !data || data.role !== 'admin') {
        if (mounted) setStatus('forbidden');
        return;
      }

      if (mounted) setStatus('authorized');
    };

    checkAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (status === 'loading') {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  if (status === 'unauthorized') {
    return <Navigate to="/admin-login" replace />;
  }

  if (status === 'forbidden') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You do not have admin access.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedAdminRoute;