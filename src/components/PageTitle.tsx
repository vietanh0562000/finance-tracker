type PageTitleProps = {
  before?: string;
  highlight: string;
  after?: string;
};

export default function PageTitle({ before, highlight, after }: PageTitleProps) {
  return (
    <h1 className="font-heading font-black text-3xl uppercase tracking-tight text-amber-900 px-5 pt-6 pb-2">
      {before && `${before} `}
      <span className="text-amber-400">{highlight}</span>
      {after && ` ${after}`}
    </h1>
  );
}
