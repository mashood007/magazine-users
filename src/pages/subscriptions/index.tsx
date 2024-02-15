import { cancel, subscribtionList } from "@/apis/subscriptions";
import AuthGuard from "@/hocs/AuthGuard";
import { useStore } from "@/utils/store";
import { Box, Button, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme } from "@mui/material"
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import TopBar from "../components/TopBar";

const Subscriptions = () => {
  const defaultTheme = createTheme();
  const accessToken = useStore((state: any) => state.accessToken)

  const { data: subscriptions, isLoading: isLoading, refetch } = useQuery(['magazines', accessToken],
    () => subscribtionList({ accessToken })
  )

  const { mutate: cancelMutation } = useMutation('cancel', cancel, {
    onSuccess: (response) => {
      if (response) {
        toast.success("Canceled")
        refetch()
      }
    },
    onError: (response) => {
      console.log(response)
    }
  })

  return (
    <AuthGuard>
      <TopBar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <TableContainer component={Paper}>
              <CssBaseline />
              <Typography component="h1" variant="h5" align="center">
                Magazines
              </Typography>
              <CssBaseline />
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Magazine</TableCell>
                    <TableCell>start date</TableCell>
                    <TableCell>end date</TableCell>
                    <TableCell>cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscriptions?.data?.map((row: any) => (
                    <TableRow
                      key={row.title}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.magazine?.title}
                      </TableCell>
                      <TableCell >{row.startDate}</TableCell>
                      <TableCell>{row.endDate}</TableCell>
                      <TableCell>{row.cost}</TableCell>
                      <TableCell>
                        <Button onClick={() => { cancelMutation({ id: row.id, accessToken }) }} aria-describedby={row.id}>Cancel</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </ThemeProvider>
    </AuthGuard>
  )
}

export default Subscriptions
