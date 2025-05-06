
interface ShareLinkDisplayProps {
  shareLink: string;
}

export function ShareLinkDisplay({ shareLink }: ShareLinkDisplayProps) {
  return (
    <div className="mt-2 p-3 bg-muted rounded-md">
      <p className="text-sm font-medium">Your share link:</p>
      <p className="text-xs break-all">{shareLink}</p>
    </div>
  );
}
