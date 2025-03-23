export function CreateQueueCommand(
  activity: string,
  checkpoint: string,
  difficulty: string,
  username: string,
): string {
  const keys: string[] = ["!queue"];
  if (activity) keys.push(activity);
  if (checkpoint) keys.push(checkpoint);
  if (difficulty) keys.push(difficulty);
  if (username) keys.push(username);

  return keys.join(" ");
}
