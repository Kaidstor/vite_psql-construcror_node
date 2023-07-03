import {Link, useMatch} from "react-router-dom";

const LayoutLink = ({to, children, ...props}) => {
   const match = useMatch(to)


   return (
      <Link to={to} className={'text-white hover:bg-gray-700 px-8 py-2' + (match ? ' bg-gray-600' : '')} {...props}>{children}</Link>
   );
};

export default LayoutLink;