import { Box, Button, Popover, TablePagination, Typography } from "@mui/material"
import { styled } from "@mui/styles"
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import React,{useState,useEffect} from "react"
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from "../base"
import { Link } from "react-router-dom";

const firestore = getFirestore(app);


const Dashboard = ()=>{
      const [open, setOpen] = React.useState(true);
      const [data, setData]  = useState([])

  const handleClick = () => {
    setOpen(!open);
  };
  const [anchorEl, setAnchorEl] = React.useState()

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open2 = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'intents')); // Replace 'your-collection' with your actual collection name
        const fetchedData = querySnapshot.docs.map((doc) => doc.data());
        setData(fetchedData);
        console.log(data, "data" )
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
console.log(data, "k")
    return(
<Container>
    <Head>
    <Header>View all Gear</Header>
   <Link to="/create" style={{textDecoration:"none"}}>
   <Add>Create+</Add>
   </Link>
    </Head>
    <Search>
        <input
        placeholder="Search here"
        />
    </Search>
    <Wrapper>
{
  data.map((item, i)=>(
    <Holder key={i}>
    <ListItemButton onClick={handleClick}>
     
    <ListItemText primary={item.tag} />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
       
        <ListItemText primary={item.responses} />
      </ListItemButton>
    </List>
  </Collapse>
  <Update>
    
    <Edit>Edit</Edit>
  
  <div>
  <Delete  onClick={handleClick2}>
   Delete
  </Delete>
  <Popover
    id={id}
    open={open2}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
  >
    <Typography sx={{ p: 2 }}>Are you sure you want to delete. yes, no</Typography>
  </Popover>
</div>
</Update>
    </Holder>
  ))
}
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Wrapper>
</Container>
    )
}

export default Dashboard

const Container = styled(Box)({
    paddingTop:"80px",
    width:"100%",
    backgroundColor:"lavender",
    minHeight:"100vh"
})
const Head = styled(Box)({
display:"flex",
justifyContent:"space-between",
padding:"20px",
alignItems:"center"
})
const Add = styled(Box)({
display:"flex",
width:"100px",
backgroundColor:"darkblue",
justifyContent:"center",
alignItems:"center",
height:"40px",
borderRadius:"5px",
color:"white",
cursor:"pointer",
fontWeight:"bold"
})

const Header = styled(Box)({
fontSize:"20px",
fontWeight:"bold",
})
const Search = styled(Box)({

})
const Wrapper = styled(Box)({
width:"90%",
border: "1px solid gray",
padding:"10px",
margin:"10px"
})

const Holder = styled(Box)({
    border: "1px dashed gray",
    borderRadius:"5px",
    padding:"5px",
})
const Question = styled(Box)({

})
const Response = styled(Box)({

})
const Update = styled(Box)({
display:"flex",
width:"100%",
justifyContent:"flex-end",
})
const Edit = styled(Button)({

})
const Delete = styled(Button)({

})

// const Container = styled(Box)({

// })

// import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// export default function BasicPopover() {
//   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div>
//       <Button aria-describedby={id} variant="contained" onClick={handleClick}>
//         Open Popover
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//       >
//         <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
//       </Popover>
//     </div>
//   );
// }