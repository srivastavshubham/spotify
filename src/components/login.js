import Logo from '../assets/Spotify_App_Logo.svg.png'
const Login =()=>{

    const handleConnect=()=>{
        console.log('connect')
        const clientId = "2dad156a8294432494902f3e2ec29c0a";
        const redirectUri = "http://localhost:3000";
        const authEndpoint = "https://accounts.spotify.com/authorize";

        const scopes = [
            "user-read-email",
            "user-read-private",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "user-read-playback-position",
        ];
        
        window.location.href= `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            " "
        )}&response_type=token&show_dialog=true`;
            
        }

    return(
        <div className='min-h-screen bg-[#140c0b]'>
            <div className='flex justify-center items-center pt-12'>
            <img src={Logo} alt="logo" height='200px' width='200px'/>
            </div>
            <div className='flex justify-center items-center text-white text-8xl font-bold'>
                Listen Your Favourite Music!
            </div>
            <div className='flex justify-center items-center pt-10'>
                <button className='bg-white p-3 rounded-lg' onClick={handleConnect}>Click here to connect</button>
            </div>
            <div className='text-green-600 flex justify-center items-center pt-5'>Please login with your Spotify account</div>
        </div>
    )
}
export default Login