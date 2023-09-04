/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Image
import WavesIcon from '@mui/icons-material/Waves';
import SettingsVoiceOutlinedIcon from '@mui/icons-material/SettingsVoiceOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SpeedIcon from '@mui/icons-material/Speed';


const Data = {
  images: [<WavesIcon/>, <EqualizerIcon/>, <MusicNoteIcon/>, <SettingsVoiceOutlinedIcon/>, <SpeedIcon/>],
  labels: ["Tipos de onda", "Caracteristicas de las ondas", "Vibracion de una cuerda", "Ondas sonoras", "Efecto doppler"],
  datasets: {
    label: "Referrals",
    backgroundColors: ["primary", "info", "warning", "success", "dark"],
    data: [25, 3, 12, 7, 10],
  },
};

export default Data;
