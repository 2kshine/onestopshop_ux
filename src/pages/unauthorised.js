// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';
// const UnauthorizedPage = () => {
//   const { state } = useLocation();
//   const [session, setSession] = useState(false);
//   useEffect(() => {
//     if (state === 'SES_EXP') {
//       setSession(true);
//     }
//   }, []);
//   return (
//     <Box
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//       }}
//     >
//       <div
//         style={{
//           backgroundImage: "url('/images/errorPic.png')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: '20vh',
//           minHeight: '350px',
//           maxHeight: '500px',
//           maxWidth: '500px',
//           minWidth: '450px',
//           width: '20vw',
//           position: 'relative',
//         }}
//       />
//       {session ? (
//         <>
//           <Typography variant="h4" gutterBottom>
//             Session expired.
//           </Typography>
//           <Typography variant="body1" paragraph>
//             Please login to continue.{' '}
//           </Typography>
//           <Button
//             component={Link}
//             to="/agent-login"
//             variant="contained"
//             color="primary"
//           >
//             Proceed To Login
//           </Button>
//         </>
//       ) : (
//         <>
//           <Typography variant="h4" gutterBottom>
//             Unauthorized Access Detected.
//           </Typography>
//           <Typography variant="body1" paragraph>
//             Login or Register as an agent to continue.
//           </Typography>
//           <Button
//             component={Link}
//             to="/agent-login"
//             variant="contained"
//             color="primary"
//           >
//             Proceed To Login
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// };

// export default UnauthorizedPage;
