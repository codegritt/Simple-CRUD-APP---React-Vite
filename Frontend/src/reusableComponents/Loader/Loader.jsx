import { useContext } from "react";
import { LoaderContext } from "../../context/LoaderContext";
import LoaderSvg from "../../assets/loader.svg";
import "./Loader.css";

export default function Loader(props) {
  const { loading } = useContext(LoaderContext);

  if (!loading && !props.loading) return null;

  return (
    <>
      {props.local && props.loading && (
        <div className="text-center">
          <img src={LoaderSvg} className="inline-block" alt="loader" />
        </div>
      )}
      {!props.local && loading && (
        <div className="loader-container z-20">
          <div className="loader">
            <img src={LoaderSvg} alt="loader" />
          </div>
        </div>
      )}
    </>
  );
}
