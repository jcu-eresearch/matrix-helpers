# Versions

## SSJS

```bash
[root@host ~]# rpm -aq|grep -i v8
v8-3.14.5.10-9.el6.x86_64
php54-php-pecl-v8js-0.1.3-2.el6.x86_64
```
 
According to the vendor:

> (The packages) would only get upgraded as part of OS patching if newer versions were available at the time of the patch. Those OS patch updates are always scheduled with the client. The worst case is if we have to patch a critical security vulnerability but even then we let you know in advance.

> If you have particular concerns about individual packages, you can remind us at those times to check versions before and after the updates.

> The V8 rpms I mentioned are specifically built and provided by Squiz from our repo, so even normal OS updates won't affect them - they'd need to have a new version built and put in the repo by us - which is pretty rare.
