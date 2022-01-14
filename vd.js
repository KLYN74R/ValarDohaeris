/*



                                                                                                                                                                                                                               
                                                                                                                                                                                                                               
VVVVVVVV           VVVVVVVV               lllllll                                    DDDDDDDDDDDDD                        hhhhhhh                                                                       iiii                   
V::::::V           V::::::V               l:::::l                                    D::::::::::::DDD                     h:::::h                                                                      i::::i                  
V::::::V           V::::::V               l:::::l                                    D:::::::::::::::DD                   h:::::h                                                                       iiii                   
V::::::V           V::::::V               l:::::l                                    DDD:::::DDDDD:::::D                  h:::::h                                                                                              
 V:::::V           V:::::Vaaaaaaaaaaaaa    l::::l   aaaaaaaaaaaaa  rrrrr   rrrrrrrrr   D:::::D    D:::::D    ooooooooooo   h::::h hhhhh         aaaaaaaaaaaaa      eeeeeeeeeeee    rrrrr   rrrrrrrrr  iiiiiii     ssssssssss   
  V:::::V         V:::::V a::::::::::::a   l::::l   a::::::::::::a r::::rrr:::::::::r  D:::::D     D:::::D oo:::::::::::oo h::::hh:::::hhh      a::::::::::::a   ee::::::::::::ee  r::::rrr:::::::::r i:::::i   ss::::::::::s  
   V:::::V       V:::::V  aaaaaaaaa:::::a  l::::l   aaaaaaaaa:::::ar:::::::::::::::::r D:::::D     D:::::Do:::::::::::::::oh::::::::::::::hh    aaaaaaaaa:::::a e::::::eeeee:::::eer:::::::::::::::::r i::::i ss:::::::::::::s 
    V:::::V     V:::::V            a::::a  l::::l            a::::arr::::::rrrrr::::::rD:::::D     D:::::Do:::::ooooo:::::oh:::::::hhh::::::h            a::::ae::::::e     e:::::err::::::rrrrr::::::ri::::i s::::::ssss:::::s
     V:::::V   V:::::V      aaaaaaa:::::a  l::::l     aaaaaaa:::::a r:::::r     r:::::rD:::::D     D:::::Do::::o     o::::oh::::::h   h::::::h    aaaaaaa:::::ae:::::::eeeee::::::e r:::::r     r:::::ri::::i  s:::::s  ssssss 
      V:::::V V:::::V     aa::::::::::::a  l::::l   aa::::::::::::a r:::::r     rrrrrrrD:::::D     D:::::Do::::o     o::::oh:::::h     h:::::h  aa::::::::::::ae:::::::::::::::::e  r:::::r     rrrrrrri::::i    s::::::s      
       V:::::V:::::V     a::::aaaa::::::a  l::::l  a::::aaaa::::::a r:::::r            D:::::D     D:::::Do::::o     o::::oh:::::h     h:::::h a::::aaaa::::::ae::::::eeeeeeeeeee   r:::::r            i::::i       s::::::s   
        V:::::::::V     a::::a    a:::::a  l::::l a::::a    a:::::a r:::::r            D:::::D    D:::::D o::::o     o::::oh:::::h     h:::::ha::::a    a:::::ae:::::::e            r:::::r            i::::i ssssss   s:::::s 
         V:::::::V      a::::a    a:::::a l::::::la::::a    a:::::a r:::::r          DDD:::::DDDDD:::::D  o:::::ooooo:::::oh:::::h     h:::::ha::::a    a:::::ae::::::::e           r:::::r           i::::::is:::::ssss::::::s
          V:::::V       a:::::aaaa::::::a l::::::la:::::aaaa::::::a r:::::r          D:::::::::::::::DD   o:::::::::::::::oh:::::h     h:::::ha:::::aaaa::::::a e::::::::eeeeeeee   r:::::r           i::::::is::::::::::::::s 
           V:::V         a::::::::::aa:::al::::::l a::::::::::aa:::ar:::::r          D::::::::::::DDD      oo:::::::::::oo h:::::h     h:::::h a::::::::::aa:::a ee:::::::::::::e   r:::::r           i::::::i s:::::::::::ss  
            VVV           aaaaaaaaaa  aaaallllllll  aaaaaaaaaa  aaaarrrrrrr          DDDDDDDDDDDDD           ooooooooooo   hhhhhhh     hhhhhhh  aaaaaaaaaa  aaaa   eeeeeeeeeeeeee   rrrrrrr           iiiiiiii  sssssssssss    
                                                                                                                                                                                                                               
                                                                                                                                                                                                                               
                                                                                                                                                                                                                               
                                                                                                                                                                                                                               
                                                                                                                                                                                                                               
                                                                                                                                                                                                                               
                                                                    
                                                                                                                                                         
88                           88      a8P   88                                                       888888888888                                         
88                           88    ,88'    88                             ,d                             88                                              
88                           88  ,88"      88                             88                             88                                              
88,dPPYba,   8b       d8     88,d88'       88  8b       d8  8b,dPPYba,  MM88MMM  ,adPPYYba,  8b,dPPYba,  88   ,adPPYba,  ,adPPYYba,  88,dPYba,,adPYba,   
88P'    "8a  `8b     d8'     8888"88,      88  `8b     d8'  88P'   `"8a   88     ""     `Y8  88P'   "Y8  88  a8P_____88  ""     `Y8  88P'   "88"    "8a  
88       d8   `8b   d8'      88P   Y8b     88   `8b   d8'   88       88   88     ,adPPPPP88  88          88  8PP"""""""  ,adPPPPP88  88      88      88  
88b,   ,a8"    `8b,d8'       88     "88,   88    `8b,d8'    88       88   88,    88,    ,88  88          88  "8b,   ,aa  88,    ,88  88      88      88  
8Y"Ybbd8"'       Y88'        88       Y8b  88      Y88'     88       88   "Y888  `"8bbdP"Y8  88          88   `"Ybbd8"'  `"8bbdP"Y8  88      88      88  
                 d8'                               d8'                                                                                                   
                d8'                               d8'                                                                                                    



CREATOR: VLad Chernenko
GitHub:https://github.com/VladChernenko


____________________________________________________________Description____________________________________________________________

Useful module to work with different cryptocurrecies

Prepared following GSVDT scheme

G-Generate
S-Sign
V-Verify
D-Derive(keypair from private,seed,etc.)
T-Transfer(transfer everything you need to verify signature)


*/

import rip from 'ripple-keypairs'

export default {

    // XPR GSVDT scheme
    XRP:{

        generate:seedOptions=>{
            
            let seed=rip.generateSeed(seedOptions),
                
                keyPair=rip.deriveKeypair(seed)

            return {seed,keyPair,address:rip.deriveAddress(keyPair.publicKey)}

        },

        sign:(stringData,privateKey)=>rip.sign(stringData,privateKey),

        verify:(plainText,signature,publicKey)=>rip.verify(plainText,signature,publicKey)

    }

}