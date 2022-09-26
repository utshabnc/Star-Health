const payment = [
  { title: "Top Payments Made" },
  { title: "Top Products" },
  { title: "Top Manufacturers" },
];

export const InfoSections = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="my-2 mx-1 p-2 border-2 border-violet-400 rounded-lg grid grid-cols-3">
        {payment.map((p) => (
          <div className="flex flex-col ">
            <p className="flex justify-center underline font font-semibold">
              {p.title}
            </p>
            <ul className="flex justify-center">
              <li>Hello</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="my-5">
        <hr />
      </div>
      <div className="my-2 p-2 border-2 border-violet-400 rounded-lg mx-1">
        <div className="flex flex-col ">
          <p className="flex justify-center text-base font-semibold">
            All Transaction Summaries
          </p>
        </div>
      </div>
    </div>
  );
};
