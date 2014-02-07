ju.io
=====

Personal microsite introducing my person.

Note
----

If you're on Mac OS and are not using Firefox, you probably run into problems
viewing my site. This is due to the operating system arbitrarily limiting
the maximum RSA key size in the crypto library and me using a 8192bit key.

See [this article](http://shizmob.tumblr.com/post/67305143330/8192-bit-rsa-keys-in-os-x)
on how to increase the maximum RSA keysize on MacOS.

**TLDR**

If you’re on Mountain Lion or lower:

    sudo defaults write /Library/Preferences/com.apple.crypto RSAMaxKeySize -int 8192

If you’re on Mavericks or higher:

    sudo defaults write /Library/Preferences/com.apple.security RSAMaxKeySize -int 8192

You will probably need to restart your machine for the changes to take effect.
