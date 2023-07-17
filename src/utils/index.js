export const mobileMaxWidth = 575;

export const dateToLocale = (date) => {
  return new Date(date).toLocaleDateString("es-ES");
};

export const parseDate = (unix_timestamp) => {
  var date = new Date(unix_timestamp);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  // Will display time in 10:30:23 format
  var formattedTime =
    day +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  return formattedTime;
};

export const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const ticketStatusColor = {
  recibida: "error",
  "inicio de servicio": "info",
  "en votación": "warning",
  "recepción de servicio": "success",
};

export const ticketPriorityColor = {
  baja: "success",
  media: "info",
  alta: "warning",
  crítica: "error",
};

export const getPermission = (userGroups, inRoute) => {
  let profile = localStorage.getItem("profile");
  if (!profile) return false;
  let groups = JSON.parse(profile).groups;
  // check if groups object value in userGroups list
  let permission = groups.some((group) => {
    return userGroups.includes(group.name);
  });

  return permission;
};

export const getComiteCommunitySlug = () => {
  let community = JSON.parse(localStorage.getItem("profile")).communities[0]
    .slug;
  return community;
};

const dv = function (T) {
  var M = 0,
    S = 1;
  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  return S ? S - 1 : "k";
};

export const validadorRut = (rutCompleto) => {
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
  var tmp = rutCompleto.split("-");
  var digv = tmp[1];
  var rut = tmp[0];
  if (digv == "K") digv = "k";
  return dv(rut) == digv;
};

export const validadorEmail = (valor) => {
  if (
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      valor
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const getBuildingByAreas = (areas) => {
  let buildings = [];
  let buildingsUuid = [];
  areas.map((area) => {
    if (!area.building) return;
    if (!buildingsUuid.includes(area.building.uuid)) {
      buildings.push({ label: area.building.name, value: area.building.uuid });
      buildingsUuid.push(area.building.uuid);
    }
  });
  return buildings;
};

/* generate timestap intervals of 1 hour since 12 hours early*/
export const generateTimeIntervals = () => {
  let intervals = [];
  let time = new Date();
  time.setHours(time.getHours() - 12);
  for (let i = 0; i < 24; i++) {
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let interval = {
      label: hour + ":" + minutes,
      value: hour + ":" + minutes,
    };
    intervals.push(interval);
    time.setHours(time.getHours() + 1);
  }
  return intervals;
};

export function isPermissionEnabled(permissionKey) {
  // Check if the permission key is in the expected format of "module-permission"
  let profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) return false;
  let permission = profile.permissions;
  //let permission = permissions.permissions;
  if (!permission) {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("profile");
    return false;
  }

  const [module, perm] = permissionKey.split("-");
  if (!module || !perm) {
    throw new Error(`Invalid permission key: ${permissionKey}`);
  }

  // Check if the module exists in the permission object
  if (!permission[module]) {
    throw new Error(`Module not found: ${module}`);
  }

  // Check if the permission exists in the module object
  if (!permission[module][perm]) {
    throw new Error(`Permission not found: ${perm} in ${module}`);
  }

  // Return the enabled flag for the permission
  return permission[module][perm].enabled;
}

export function updatePermissionEnabled(permissionKey, isEnabled) {
  // Check if the permission key is in the expected format of "module-permission"
  let permission = JSON.parse(localStorage.getItem("profile")).permissions;

  const [module, perm] = permissionKey.split("-");
  if (!module || !perm) {
    throw new Error(`Invalid permission key: ${permissionKey}`);
  }

  // Check if the module exists in the permission object
  if (!permission[module]) {
    throw new Error(`Module not found: ${module}`);
  }

  // Check if the permission exists in the module object
  if (!permission[module][perm]) {
    throw new Error(`Permission not found: ${perm} in ${module}`);
  }

  // Update the enabled flag for the permission and return its new value
  permission[module][perm].enabled = isEnabled;
  return permission;
}
