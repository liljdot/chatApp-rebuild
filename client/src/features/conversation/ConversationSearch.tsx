import { IoSearchSharp } from "react-icons/io5"

interface Props { }

const ConversationSearch: React.FC<Props> = () => {

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

export default ConversationSearch