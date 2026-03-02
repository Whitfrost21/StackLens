type Props = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export default function PageHeader({ title, description, actions }: Props) {
  return (
    <div className="mb-6 flex items-start justify-between px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

        {description && (
          <p className="mt-1 text-sm text-neutral-400">{description}</p>
        )}
      </div>

      {actions && <div>{actions}</div>}
    </div>
  );
}
