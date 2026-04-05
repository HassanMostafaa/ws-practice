import { getServerLocation } from "@/service/server-location.service";

export const ServerLocation = async () => {
  const { data: { location } = {} } = await getServerLocation();
  return (
    <div className="p-3 rounded-lg bg-amber-700/5 text-amber-800 border border-amber-800">
      ServerLocation: {location}{" "}
    </div>
  );
};
