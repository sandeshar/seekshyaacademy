import React from 'react';
import NavbarUI from './NavbarUI';
import { getNavbar } from '@/actions/navbar';
import { getSettings } from '@/actions/settings';

const Navbar = async () => {
    const navbarData = await getNavbar();
    const settings = await getSettings();

    return <NavbarUI navbarData={navbarData} settings={settings} />;
};

export default Navbar;
