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

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";


// @mui icons
import WavesIcon from '@mui/icons-material/Waves';
import SettingsVoiceOutlinedIcon from '@mui/icons-material/SettingsVoiceOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SpeedIcon from '@mui/icons-material/Speed';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import { capitalize } from "utils";

// Analytics application components
import SocialItem from "layouts/applications/analytics/components/SocialItem";

function Social(props) {

  const renderIcon = (icon) => {
    switch (icon) {
      case "tipos_de_ondas":
        return <WavesIcon />;
      case "caracteristicas_de_las_ondas":
        return <EqualizerIcon />;
      case "vibracion_de_una_cuerda":
        return <MusicNoteIcon />;
      case "ondas_sonoras":
        return <SettingsVoiceOutlinedIcon />;
      case "efecto_doppler":
        return <SpeedIcon />;
      default:
        return <Icon>{icon}</Icon>;
    }
  }

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6">Conocimientos</SoftTypography>
        <Tooltip title="Que tanto sabes de cada tema" placement="bottom">
          <SoftButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </SoftButton>
        </Tooltip>
      </SoftBox>

      <SoftBox p={2}>
        {
          Object.keys(props.ratings).map(key => (
            <SocialItem
              key={key}
              icon={{ color: key, component: renderIcon(key) }}
              title={capitalize(key.replace(/_/g, " "))}
              percentage={((props.ratings[key] - 1000) / 10) }
            />
          ))
        }
      </SoftBox>
    </Card>
  );
}

export default Social;
