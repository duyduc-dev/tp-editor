import { Console, Hook, Unhook } from 'console-feed';
import { useEffect, useState } from 'react';

const EditorConsole = () => {
  const [logs, setLogs] = useState<any[]>([
    {
      method: 'result',
      data: ['Result'],
    },
    {
      method: 'command',
      data: ['Command'],
    },
  ]);

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false,
    );
    return () => void Unhook(hookedConsole);
  }, []);

  return <Console logs={logs} variant="dark" />;
};

export default EditorConsole;
