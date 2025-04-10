import  {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";


const RootLayout = async ({ children} :{ children : ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect('/sign-in');
    }
    return (
        <div className="root-layout">
            <nav className="flex justify-between items-center px-4 py-3 border-b ">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2 className="text-primary-100 text-xl font-semibold">PrepWise</h2>
                </Link>

                {/* Profile Button */}
                <Button asChild className="btn-secondary">
                    <Link href="/dashboard">Go to Profile</Link>
                </Button>
            </nav>

            {children}
        </div>
    )
}
export default RootLayout
