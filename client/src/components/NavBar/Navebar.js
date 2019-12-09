import React from 'react';
import "./Navbar.css";
import "./Navbar.js";

const NavBar = props => {
   return ( 
        <nav className="main-menu">

            <div>
            <a className="logo" href="">
            </a> 
            </div> 
        <div className="settings"></div>
                
        <ul>
            
        <li>                                   
        <a href="">
        <i className="fa fa-home fa-lg"></i>
        <span className="nav-text">Home</span>
        </a>
        </li>   
            
        <li>                                 
        <a href="">
        <i className="fa fa-user fa-lg"></i>
        <span className="nav-text">LogOut</span>
        </a>
        </li>              
        
    
        <li className="darkerlishadow">
        <a href="">
        <i className="fa fa-clock-o fa-lg"></i>
        <span className="nav-text">Community</span>
        </a>
        </li>
            
        <li className="darkerli">
        <a href="">
        <i className="fa fa-desktop fa-lg"></i>
        <span className="nav-text">My Dashboard</span>
        </a>
        </li>
            
        <li className="darkerli">
        <a href=""></a>
        <i className="fa fa-plane fa-lg"></i>
        <span className="nav-text">Social/Connect</span>
        <div className="addthis_default_style addthis_32x32_style"></div>
            
        <div style="position:absolute;
        margin-left: 56px;top:3px;"> 
            
            
        
            
            <a href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank" className="share-popup"><img src="http://icons.iconarchive.com/icons/danleech/simple/512/facebook-icon.png" width="30px" height="30px"></img></a>
        
            <a href="https://twitter.com/share" target="_blank" className="share-popup"><img src="https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/Twitter_alt.png" width="30px" height="30px"></img></a>
        
            
        
        
        <a href="https://plusone.google.com/_/+1/confirm?hl=en&url=_URL_&title=_TITLE_" target="_blank" className="share-popup"><img src="http://icons.iconarchive.com/icons/danleech/simple/512/google-plus-icon.png" width="30px" height="30px"></img></a>   
        </div>

        <script type="text/javascript">var addthis_config = {"data_track_addressbar:=true"};</script>
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4ff17589278d8b3a"></script>
                                <span className="twitter"></span>
                                <span className="google"></span>
                                <span className="fb-like"><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Ffacebook.com%2Fstartific&amp;width&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:35px;" allowTransparency="true"></iframe></span>
                                <span className="nav-text"></span>
        </li>
            
        <li className="darkerli">
        <a href="">
        <i className="fa fa-shopping-cart"></i>
            <span className="nav-text">Info</span>
        </a>
        </li>
            
        <li className="darkerli">
        <a href="">
        <i className="fa fa-microphone fa-lg"></i>
        <span className="nav-text">Settings</span>
        </a>
        </li>
        </ul>
        
            
        <li>
                                            
        <a href="">
        <i className="fa fa-question-circle fa-lg"></i>
        <span className="nav-text">Help</span>
        </a>
        </li>     
            </nav>

            );
};

export default NavBar;