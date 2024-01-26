import React from 'react';
import { Outlet } from "react-router-dom";
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import ContentHeader from "../shared/headers/ContentHeader";


const StandardContentLayout = () => {
    return (
        <>
            <JumboContentLayout
                header={<ContentHeader title={"Page heading"} avatar={undefined} subheader={undefined} body={undefined} back={undefined} action={undefined} tabs={undefined} children={undefined} elevation={undefined} sx={undefined} />}
            >
                <Outlet />
            </JumboContentLayout>
        </>

    );
};

export default StandardContentLayout;