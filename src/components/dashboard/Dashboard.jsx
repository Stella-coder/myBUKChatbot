import { Box,  } from "@mui/material"
import { styled } from "@mui/styles"
import React, { useEffect, useState } from "react"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "../../base";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const firestore = getFirestore(app);
const Dashboard = ()=>{
    const[data, setData] = useState([])

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },

        {
          id: 'role',
          label: 'Role',
          minWidth: 170,
        },
        {
          id: 'email',
          label: 'Email',
          minWidth: 170,

        },
        {
          id: 'password',
          label: 'Password',
          minWidth: 170,
        
        },
        { id: 'actions', label: 'Actions', align: 'center', minWidth: 100 },
      ];

    
     
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(
            query(collection(firestore, 'users'), where('role', '!=', ''))
          );
      
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          setData(fetchedData);
          console.log(data, "data");
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      console.log(data, "data")
    
      useEffect(() => {
        
        fetchData();
        // deleteIntent()
      }, []);
    return(
        <Container>
            <Wrapper>
                <Holder>
                    <Box1>No of mediators<Text>{data.length}</Text></Box1>
                    <Box1>No of Complains<Text>90</Text></Box1>
                </Holder>
                <Holder2>
                    <Header>Accounts</Header>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
     
        <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
  {data.map((item) => (
    <TableRow key={item.id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.role}</TableCell>
      <TableCell>{item.password}</TableCell>
      {/* Render the icons in the "Actions" column */}
      <TableCell align="center">
        {/* <EditIcon color="primary" /> */}
        <DeleteIcon color="error" />
      </TableCell>
    </TableRow>
  ))}
</TableBody>
    </Table>
  </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

                </Holder2>
            </Wrapper>
        </Container>
    )
}

export default Dashboard

const Container = styled(Box)({
    width:"100%",
    display:"flex",
    marginLeft:"20%",
    minHeight:"90vh",
    
    // backgroundColor:"green"
})
const Wrapper = styled(Box)({
    display:"flex",
    flexDirection:'column',
    marginTop:"20px",
    width:"80%",
    alignItems:"flex-end",
    padding:"5px"

})
const Holder = styled(Box)({
    display:"flex",
    width:"100%",
    justifyContent:"space-around"
})
const Box1 = styled(Box)({
    background:"rgba(255,255,255,0.2)",
boxShadow: "0px 3px 8px ",
display:"flex",
flexWrap:"wrap",
width:"150px",
height:"150px",
borderRadius:"5px",
justifyContent:"center",
alignItems:"center",
flexDirection:"column",
fontSize:"12px",
})
const Text = styled(Box)({
    fontSize:"25px",
    fontWeight:"bold"
})
const Header = styled(Box)({
    fontSize:"20px",
    fontWeight:"bold",
    margin:"10px 0px",
    color:"blue"
})
const Holder2 = styled(Box)({
    width:"100%",
    // height:"900px",
    padding:"10px"
// backgroundColor:"red"
})
// const Container = styled(Box)({})

