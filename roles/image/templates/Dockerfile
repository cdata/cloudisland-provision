FROM {{ image_base }}
MAINTAINER cdata

ENV BUILDDIR {{ image_build_root }}/{{ image_name }}/{{ image_tag }}

ADD {{ image_name }} $BUILDDIR/provision

RUN ansible-playbook $BUILDDIR/provision/playbook.yml -c local -e "image_name={{ image_name }} image_tag={{ image_tag }} {{ image_variables }}"

{% for port in image_ports %}
EXPOSE {{ port }}
{% endfor %}

{% for volume in image_volumes %}
VOLUME {{ volume }}
{% endfor %}

ENTRYPOINT {{ image_command }}
