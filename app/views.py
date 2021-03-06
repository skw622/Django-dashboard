# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.http import HttpResponse
from django import template
from django.views.decorators.csrf import csrf_exempt
import os
import psutil
import json


@login_required(login_url="/login/")
def index(request):
    context = {}
    context['segment'] = 'index'

    html_template = loader.get_template('index.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]
        context['segment'] = load_template

        html_template = loader.get_template(load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:

        html_template = loader.get_template('page-500.html')
        return HttpResponse(html_template.render(context, request))


@csrf_exempt
@login_required(login_url="/login/")
def functionality(request):
    if (data == 'reboot'):
        print(data)
        os.system("sudo systemctl reboot")
    else:
        print(data, '----')
        os.system("sudo systemctl poweroff")
    return HttpResponse('ok')

@login_required(login_url="/login/")
def getStatus(request):
    memory = psutil.virtual_memory()._asdict()
    cpu = psutil.cpu_percent(interval=None)
    data = {
        "cpu": cpu, "memory": memory
    }
    res = json.dumps(data)
    return HttpResponse(res)