import { Outlet } from 'react-router-dom';
import Navbar from "./navbar/Navbar";

function Layout() {
    return (
        <div className='flex flex-col items-center'>
            <Navbar />
            <main className='w-full max-w-[1200px] md:p-12'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;