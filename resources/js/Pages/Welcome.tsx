import React from 'react';
import { Github } from 'lucide-react';

import { Button } from '@/Components/ui/button';
import { Link } from 'react-router-dom';
import { DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '@/router/routes';
import { Head } from '@/Components/seo';

export const Welcome = React.memo(() => {
  const auth = {
    user: false,
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Head title="Budget Tracker by Sameer" />
      <main className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Budget Tracker
          </h1>
          <p className="mt-2">
            Manage your daily expenses and keep track of your budget
          </p>
          <div className="mt-8 flex justify-center">
            {auth.user ? (
              <Button variant="default" asChild>
                <Link to={DASHBOARD_ROUTE}>Dashboard</Link>
              </Button>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="default" asChild>
                  <Link to={LOGIN_ROUTE}>Log in</Link>
                </Button>
                <Button variant="destructive" asChild>
                  <Link to={REGISTER_ROUTE}>Register</Link>
                </Button>
                <a
                  href="https://github.com/wsameer/budget-tracker"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" /> Github Repo
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
});

Welcome.displayName = 'Welcome';
