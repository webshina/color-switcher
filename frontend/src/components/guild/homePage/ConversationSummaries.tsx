type Props = {
  summaries: {
    id: number;
    content: string;
  }[];
};
export const ConversationSummaries: React.FC<Props> = (props) => {
  return (
    <>
      <div className="p-4 h-48 overflow-auto rounded-md bg-slate-800">
        {props.summaries.map((summary) => {
          return (
            <div
              key={summary.id}
              className="my-1 p-3 rounded-md bg-white/10 text-sm"
            >
              {summary.content}
            </div>
          );
        })}
      </div>
    </>
  );
};
