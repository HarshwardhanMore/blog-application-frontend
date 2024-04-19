import { CircleUserRound } from "lucide-react";

const CommentCard = ({ data }: any) => {
  return (
    <div className="w-full flex flex-col items-start gap-y-0.5">
      <div className="w-full flex items-center gap-x-2.5">
        <span className="flex items-center gap-x-1">
          <CircleUserRound size={20} strokeWidth={1} color="black" />
          <p className="text-sm font-semibold">{`${data?.commentedByUser?.firstname} ${data?.commentedByUser?.lastname}`}</p>
        </span>
        <p className="font-normal text-gray-400 text-xs">
          {data?.createdAt}
        </p>
      </div>
      <span className="flex gap-x-1">
        <CircleUserRound size={30} strokeWidth={1} className=" invisible" />
        <p className="font-normal text-sm">
          {data?.comment}
        </p>
      </span>
    </div>
  );
};

export default CommentCard;