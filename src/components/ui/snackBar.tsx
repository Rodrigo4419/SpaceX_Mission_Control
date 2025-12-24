import {
  ErrorFilledIcon,
  WarningFilledIcon,
  CheckedFilledIcon,
  InfoIcon,
} from "@/components/svg";

type TSnackBar = {
  active: boolean;
  message: string;
  title: string;
  type: "warning" | "error" | "success" | "neutral" | "";
};

type TProps = {
  info: {
    active: boolean;
    message: string;
    title: string;
    type: "warning" | "error" | "success" | "neutral" | "";
  };
  updateInfo: React.Dispatch<React.SetStateAction<TSnackBar>>;
};

const neutral = {
  bg: "#18181b",
  title: "#d4d4d8",
  message: "#9f9fa9",
};
const success = {
  bg: "#0d542b",
  title: "#b9f8cf",
  message: "#05df72",
};
const warning = {
  bg: "#7b3306",
  title: "#fef3c6",
  message: "#fee685",
};
const error = {
  bg: "#82181a",
  title: "#ffc9c9",
  message: "#ffa2a2",
};

export default function SnackBar({ info, updateInfo }: TProps) {
  const { active, title, message, type } = info;
  //if(!active)return null
  if (active) {
    setTimeout(() => {
      updateInfo((sb) => {
        return { ...sb, active: false };
      });
    }, 5000);
  }
  return (
    <div
      className={`fixed flex w-[24rem] rounded-lg items-center gap-3 bottom-8 left-8 transition duration-300 p-3`}
      style={{
        border: type === 'neutral' ? '1px solid #27272a' : 'none',
        transform: active ? "translateY(0%)" : "translateY(200%)",
        backgroundColor:
          type === "neutral"
            ? neutral.bg
            : type === "success"
            ? success.bg
            : type === "warning"
            ? warning.bg
            : error.bg,
      }}
    >
      {type === "neutral" ? (
        <InfoIcon width="1.5rem" height="1.5rem" color={neutral.title} />
      ) : type === "success" ? (
        <CheckedFilledIcon
          width="1.5rem"
          height="1.5rem"
          color={success.title}
        />
      ) : type === "warning" ? (
        <WarningFilledIcon
          width="1.5rem"
          height="1.5rem"
          color={warning.title}
        />
      ) : (
        <ErrorFilledIcon width="1.5rem" height="1.5rem" color={error.title} />
      )}
      <div>
        <h4
          className={`text-sm font-semibold`}
          style={{color:type === "neutral"
              ? neutral.title
              : type === "success"
              ? success.title
              : type === "warning"
              ? warning.title
              : error.title}}
        >
          {title}
        </h4>
        <p
          className={`text-xs font-semibold`}
          style={{color:type === "neutral"
              ? neutral.message
              : type === "success"
              ? success.message
              : type === "warning"
              ? warning.message
              : error.message}}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
