import { useLocation } from "react-router-dom";

export const InfoTask = () => {
  const location = useLocation();
  const data = location.state;
  
  return (
    <>
      <h1>InfoTask</h1>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <code>
            {JSON.stringify(data, null, 5)}
          </code>
        </div>
      </div>
    </>
  )
}
