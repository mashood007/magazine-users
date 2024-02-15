import { Box, Button, Container, CssBaseline, Modal, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from "@mui/material"
import AuthGuard from "@/hocs/AuthGuard";
import Paper from '@mui/material/Paper';
import { useMutation, useQuery } from "react-query";
import { magazinesList, subscribeMagazine } from "@/apis/magazines";
import { useStore } from "@/utils/store";
import React from "react";
import toast from "react-hot-toast";
import TopBar from "../components/TopBar";

const Magazines = () => {
  const defaultTheme = createTheme();
  const accessToken = useStore((state: any) => state.accessToken)

  const { data: magazines, isLoading: isLoading } = useQuery(['magazines', accessToken],
    () => magazinesList(accessToken)
  )

  const [open, setOpen] = React.useState(false);
  const [magazine, setMagazine] = React.useState<any>({});
  const [startDate, setStartDate] = React.useState<any>('');

  const handleOpen = (magazineData: any) => {
    setMagazine(magazineData)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: any = { startDate, magazineId: magazine.id, accessToken }
    subscribeMutation(params)
  }

  const { mutate: subscribeMutation } = useMutation('subscribe', subscribeMagazine, {
    onSuccess: (response) => {
      if (response) {
        toast.success("Subscribed")
        setOpen(false)
      }
    },
    onError: (response) => {
      console.log(response)
    }
  })

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



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
                    <TableCell>Title</TableCell>
                    <TableCell>description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {magazines?.data?.map((row: any) => (
                    <TableRow
                      key={row.title}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell >{row.description}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>
                        <Button aria-describedby={row.id} onClick={() => { handleOpen(row) }}>Subscribe</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </ThemeProvider>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography margin={2} id="keep-mounted-modal-title" variant="h6" component="h2">
            Subscribe {magazine?.title}
          </Typography>
          <CssBaseline />
          <Stack spacing={2} direction="row">
            <TextField id="outlined-basic" label="Start date" onChange={(e) => setStartDate(e.target.value)} type="date" variant="outlined" size="small" />
            <Button type="submit" variant="contained">Subscribe</Button>
          </Stack>
        </Box>
      </Modal>
    </AuthGuard>
  )
}

export default Magazines
