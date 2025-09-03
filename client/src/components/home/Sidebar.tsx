import { IoSearchSharp } from "react-icons/io5"

const Sidebar = () => {
    const conversationFieldOpen = true

    return (
        <div className={`border-r border-slate-500 p-4 flex flex-col ${conversationFieldOpen ? "max-w-0 px-0 overflow-y-hidden" : "max-w-screen"} md:p-4 md:max-w-100 transition-width duration-500 ease-in-out`}>
            <SidebarSearch />
        </div>
    )
}

const SidebarSearch: React.FC = () => {

    return (
        <>
            <form className="flex items-center gap-2">
                <input type="text" className="input input-bordered rounded-full" />

                <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                    <IoSearchSharp className="size-6 outline-none" />
                </button>
            </form>
        </>
    )
}

export default Sidebar