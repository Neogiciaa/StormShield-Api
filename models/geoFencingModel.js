import axios from 'axios';

const getAccessToken = async () => {
    const clientId = process.env.ORANGE_CLIENT_ID;
    const clientSecret = process.env.ORANGE_CLIENT_SECRET;

    const response = await axios.post(
        'https://api.orange.com/oauth/v3/token',
        new URLSearchParams({
            grant_type: 'client_credentials',
        }),
        {
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return response.data.access_token;
};

export const createDangerZone = async () => {  // TODO Recup dynamiquement lat, lon et le n° du front
    const accessToken = await getAccessToken();
    try {
        const response = await axios.post('https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/simulated', {
            protocol: 'HTTP',
            sink:'https://sink-server-hackaton.vercel.app/sink',
            types: ['org.camaraproject.geofencing-subscriptions.v0.area-entered'],
            config: {
                subscriptionDetail: {
                    device: {phoneNumber: '+33699901032'},
                    area: {
                        areaType: 'CIRCLE',
                        center: {latitude: 48.816, longitude: 2.305},
                        radius: 2000
                    }
                },
                initialEvent: true,
                subscriptionMaxEvents: 10,
                subscriptionExpireTime: '2024-12-02T11:25:00.000Z' // Changer heure !
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export const getAllSubscriptions = async (lat, lon) => {
    const accessToken = await getAccessToken();

    const response = await axios.get('https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
            }
        },
    )

    return response.data;
}

export const getOneSubscriptionById = async (subscriptionId) => {
    const accessToken = await getAccessToken();

    const response = await axios.get(`https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions?${subscriptionId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
            }
        },
    )

    return response.data;
}

export const deleteSubscriptionById = async (subscriptionId) => {
    const accessToken = await getAccessToken();

    return await axios.delete(`https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions?${subscriptionId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
            }
        },
    )
}

