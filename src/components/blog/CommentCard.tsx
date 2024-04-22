import User from "../User";

const CommentCard = ({ data }: any) => {
  return (
    <div className="w-full flex flex-col items-start ">
      <div className="w-full flex items-center gap-x-2.5">
        <span className="flex items-center gap-x-1">
          {/* <CircleUserRound size={20} strokeWidth={1} color="black" /> */}
          <User size={"small"} />
          <p className="text-sm font-medium">{`${data?.commentedByUser?.firstname} ${data?.commentedByUser?.lastname}`}</p>
        </span>
        <p className="font-normal text-gray-400 text-xs">{data?.createdAt}</p>
      </div>
      <span className="flex gap-x-1">
        {/* <CircleUserRound size={20} strokeWidth={1} className="invisible" /> */}
        <span className="invisible">
          <User size={"small"} />
        </span>
        <p className="font-normal text-sm text-gray-500">{data?.comment}</p>
      </span>
    </div>
  );
};

export default CommentCard;
