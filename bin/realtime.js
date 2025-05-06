const legacyURL = "https://api.at.govt.nz/realtime/legacy/vehiclelocations?tripid&vehicleid";

const field = (f) => {
    return f ?? '';
}

const getData = async (url, key) => {
    const init = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Ocp-Apim-Subscription-Key": key,
        },
    };

    fetch(url, init)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.status === "OK") {
                console.log("lat,lng,bearing,speed,ts,vehicle_id,vehicle_label,vehicle_plate")

                data.response.entity.forEach((r) => {
                    const fields = [
                        field(r.vehicle?.position?.latitude),
                        field(r.vehicle?.position?.longitude),
                        field(r.vehicle?.position?.bearing),
                        field(r.vehicle?.position?.speed),
                        field(r.vehicle?.timestamp),
                        field(r.vehicle?.vehicle?.id),
                        field(r.vehicle?.vehicle?.label),
                        field(r.vehicle?.vehicle?.license_plate),
                    ];

                    console.log(fields.join(","));
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

(async () => {
    await getData(legacyURL, process.env.APTD_PRIMARY_KEY);
})();
