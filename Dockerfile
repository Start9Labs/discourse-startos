ARG IMAGE
FROM ${IMAGE}
# Gems that bundle their own CA file trust it instead of the system store.
RUN M=MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr \
 && grep -rlZ "$M" /var/www/discourse /usr/local/lib/ruby | xargs -0 -r -n1 cp /etc/ssl/certs/ca-certificates.crt \
 && ! grep -rq "$M" /var/www/discourse /usr/local/lib/ruby /etc/ssl/certs/ca-certificates.crt
