import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.interface";

const handleDuplicateError = (err: unknown): TGenericErrorResponse => {
  const match = (err as Error).message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleDuplicateError;
