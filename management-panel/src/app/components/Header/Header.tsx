import { getServerSession } from 'next-auth';
import LogoutButton from '../LogoutButton/LogoutButton';
import React from 'react'

export const Header = async (props: any) => {
  const session = await getServerSession();

  return (
    <header>
        <nav>
            <ul>
                {
                  !session 
                    ?
                      (<><li><a href="/user/signup">Cadastro</a></li>
                      <li><a href="/user/login">Login</a></li></>)
                    :
                      <><LogoutButton /></>

                }
            </ul>
        </nav>
    </header>
  )
}
