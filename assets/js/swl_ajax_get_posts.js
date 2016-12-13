/*function get_projects(project_id) {
  jQuery.ajax({
    url: ajaxgetprojectimgs.ajaxurl,
    type: 'post',
    data: {
      action: 'ajax_get_project_imgs',
      project_id: project_id,
    },
    dataType: 'json',
    success: function(result) {
      jQuery.each(result, function(index, value) {
        nextProj.append(value);
      });
      resizeSite();

      if (doSlide) {
        slideToProject(thisProject, current, nextProj, dir);
      }
    }
  });
}*/
