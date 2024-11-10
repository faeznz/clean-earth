// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardAdminLayout } from "./layout";
import { DashboardUserLayout } from "./layout";

import {
  Nasabah,
  SetorSampah,
  Postingan,
  PengaturanAdmin,
  Homepage,
  Edukasipage,
  Loginpage,
  Registerpage,
  DashboardAdmin,
  DashboardUser,
  AkunSaya,
  Transaksi,
  PengaturanBiodataUser,
  PengaturanKatasandiUser,
  PengaturanBiodataAdmin,
  PengaturanKatasandiAdmin,
  TambahNasabah,
  BacaArtikel,
  EditNasabah,
  Komunitaspage,
  TambahSetorSampah,
  EditSetorSampah,
  GetPostingan,
  EditPostingan,
} from "./pages/";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/edukasi' element={<Edukasipage />} />
        <Route path='/komunitas' element={<Komunitaspage />} />
        <Route path='/baca/:id' element={<BacaArtikel />} />
        <Route path='/masuk' element={<Loginpage />} />
        <Route path='/daftar' element={<Registerpage />} />

        <Route path='/dashboard' element={<DashboardAdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path='nasabah' element={<Nasabah />} />
          <Route path='setorsampah' element={<SetorSampah />} />
          <Route path='pengaturan' element={<PengaturanAdmin />} />
          <Route path='biodata' element={<PengaturanBiodataAdmin />} />
          <Route path='katasandi' element={<PengaturanKatasandiAdmin />} />
          <Route path='tambahnasabah' element={<TambahNasabah />} />
          <Route path='tambahsetorsampah' element={<TambahSetorSampah />} />
          <Route path='editnasabah/:id' element={<EditNasabah />} />
          <Route path='editsetorsampah/:id' element={<EditSetorSampah />} />
          <Route path={"postingan"} element={<GetPostingan />} />
          <Route path='tambahpostingan' element={<Postingan />} />
          <Route path='editpostingan/:id' element={<EditPostingan />} />
        </Route>

        <Route path='/profile' element={<DashboardUserLayout />}>
          <Route index element={<DashboardUser />} />
          <Route path='transaksi' element={<Transaksi />} />
          <Route path='akunsaya' element={<AkunSaya />} />
          <Route
            path='pengaturankatasandi'
            element={<PengaturanKatasandiUser />}
          />
          <Route path='pengaturanbiodata' element={<PengaturanBiodataUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
